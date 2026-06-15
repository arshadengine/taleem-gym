import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  setDoc,
  getDocs,
  where,
  Timestamp
} from 'firebase/firestore';


const GymContext = createContext();

export const useGym = () => useContext(GymContext);

export const GymProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [requests, setRequests] = useState([]);
  const [staff, setStaff] = useState([]);
  const [staffAttendance, setStaffAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listeners
    const unsubMembers = onSnapshot(collection(db, 'members'), (snapshot) => {
      setMembers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubPlans = onSnapshot(collection(db, 'plans'), (snapshot) => {
      setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubAttendance = onSnapshot(query(collection(db, 'attendance'), orderBy('checkedInAt', 'desc')), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAttendance(data);
    }, (error) => {
      console.warn('Attendance OrderBy failed (possibly missing index), falling back to manual sort.');
      onSnapshot(collection(db, 'attendance'), (s) => {
        const data = s.docs.map(d => ({ id: d.id, ...d.data() }));
        // Manual sort as fallback
        data.sort((a, b) => (b.checkedInAt?.seconds || 0) - (a.checkedInAt?.seconds || 0));
        setAttendance(data);
      });
    });

    const unsubRequests = onSnapshot(collection(db, 'requests'), (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubStaff = onSnapshot(collection(db, 'staff'), (snapshot) => {
      setStaff(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubStaffAttendance = onSnapshot(collection(db, 'staff_attendance'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (b.checkedInAt?.seconds || 0) - (a.checkedInAt?.seconds || 0));
      setStaffAttendance(data);
    });

    setLoading(false);

    return () => {
      unsubMembers();
      unsubPlans();
      unsubAttendance();
      unsubRequests();
      unsubStaff();
      unsubStaffAttendance();
    };
  }, []);

  // Helper to generate 4-digit ID
  const generateMemberId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Actions
  const addMember = async (memberData) => {
    const memberId = `TG${Math.floor(10000 + Math.random() * 90000)}`; // Matches user's TGXXXXX format
    const totalAmount = Number(memberData.totalAmount || 0);
    const paidAmount = Number(memberData.paidAmount || memberData.paymentAmount || 0);
    const remainingBalance = Math.max(0, totalAmount - paidAmount);

    const newMember = {
      id: memberId,
      name: memberData.name,
      phoneNumber: memberData.phone,
      membershipType: memberData.membershipType,
      membershipStart: Timestamp.fromDate(new Date(memberData.startDate)),
      membershipExpiry: Timestamp.fromDate(new Date(memberData.expiryDate)),
      isFrozen: false,
      status: 'Active',
      freezeCount: 0,
      freezeDate: null,
      attendanceHistory: [],
      totalAmount,
      paidAmount,
      remainingBalance,
      paymentHistory: paidAmount > 0 ? [{
        amount: paidAmount,
        date: Timestamp.now(),
        id: `REG_${Date.now()}`,
        method: memberData.paymentMethod || 'Cash',
        status: 'Completed',
        type: 'Membership'
      }] : [],
      pendingRequest: null,
      createdAt: Timestamp.now()
    };

    // Using memberId as the document ID as seen in user's screenshot (TG60728)
    await setDoc(doc(db, 'members', memberId), newMember);
    return memberId;
  };

  const updateMember = async (id, updates) => {
    await updateDoc(doc(db, 'members', id), updates);
  };

  const recordPayment = async (memberId, amount, method = 'Cash') => {
    const memberRef = doc(db, 'members', memberId);
    const member = members.find(m => m.id === memberId);
    if (!member) throw new Error('Member not found');

    const paymentAmount = Number(amount);
    const newPaidAmount = Number(member.paidAmount || 0) + paymentAmount;
    const newRemainingBalance = Math.max(0, Number(member.totalAmount || 0) - newPaidAmount);

    const newPayment = {
      amount: paymentAmount,
      date: Timestamp.now(),
      id: `PAY_${Date.now()}`,
      method: method,
      status: 'Completed',
      type: 'Installment'
    };

    const newPaymentHistory = [...(member.paymentHistory || []), newPayment];

    await updateDoc(memberRef, {
      paidAmount: newPaidAmount,
      remainingBalance: newRemainingBalance,
      paymentHistory: newPaymentHistory
    });
  };

  const deleteMember = async (id) => {
    await deleteDoc(doc(db, 'members', id));
  };

  const addPlan = async (planData) => {
    const newPlan = {
      name: planData.name,
      priceInr: Number(planData.price),
      durationDays: Number(planData.duration),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await addDoc(collection(db, 'plans'), newPlan);
  };

  const markAttendance = async (member) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if already marked today
      const q = query(
        collection(db, 'attendance'), 
        where('memberId', '==', member.id), 
        where('date', '==', today)
      );
      const existing = await getDocs(q);
      
      if (!existing.empty) return { success: false, message: 'Attendance already marked today' };

      const newEntry = {
        memberDocId: member.id,
        memberId: member.id,
        memberName: member.name,
        date: today,
        time: new Date().toLocaleTimeString(),
        checkedInAt: Timestamp.now()
      };
      
      await addDoc(collection(db, 'attendance'), newEntry);
      
      const memberRef = doc(db, 'members', member.id);
      await updateDoc(memberRef, {
        attendanceHistory: [Timestamp.now(), ...member.attendanceHistory || []].slice(0, 50)
      });

      return { success: true, message: `Attendance marked for ${member.name}` };
    } catch (error) {
      console.error('Mark Attendance Error:', error);
      return { success: false, message: `System Error: ${error.message}` };
    }
  };


  const submitRequest = async (request) => {
    await addDoc(collection(db, 'requests'), {
      ...request,
      status: 'Pending',
      timestamp: new Date().toISOString()
    });
  };

  const resumeMembership = async (memberId) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    let newExpiry = member.membershipExpiry;
    if (member.freezeDate && member.membershipExpiry) {
      const freezeStart = member.freezeDate.toDate();
      const now = new Date();
      const daysFrozen = Math.max(0, Math.floor((now.getTime() - freezeStart.getTime()) / (1000 * 60 * 60 * 24)));
      
      const currentExpiry = member.membershipExpiry.toDate();
      currentExpiry.setDate(currentExpiry.getDate() + daysFrozen);
      newExpiry = Timestamp.fromDate(currentExpiry);
    }

    const memberRef = doc(db, 'members', memberId);
    await updateDoc(memberRef, { 
      status: 'Active',
      isFrozen: false,
      freezeDate: null,
      freezeEndDate: null,
      pendingRequest: null,
      membershipExpiry: newExpiry
    });
  };

  const approveRequest = async (request) => {
    const memberRef = doc(db, 'members', request.memberDocId);
    
    if (request.type === 'Freeze') {
      const durationDays = request.durationDays || 30;
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + durationDays);

      await updateDoc(memberRef, { 
        status: 'Frozen',
        isFrozen: true,
        freezeDate: Timestamp.now(),
        freezeEndDate: Timestamp.fromDate(endDate),
        freezeCount: (request.currentFreezeCount || 0) + 1,
        pendingRequest: null
      });
    } else if (request.type === 'Renew') {
      await updateDoc(memberRef, { 
        membershipType: request.planName,
        membershipStart: Timestamp.fromDate(new Date(request.startDate)),
        membershipExpiry: Timestamp.fromDate(new Date(request.expiryDate)),
        status: 'Active',
        isFrozen: false,
        pendingRequest: null
      });
    } else if (request.type === 'Resume') {
      await resumeMembership(request.memberDocId);
    }

    await updateDoc(doc(db, 'requests', request.id), { status: 'Approved' });
  };

  // Auto-resume check
  useEffect(() => {
    if (!members || members.length === 0) return;
    const now = new Date();
    members.forEach(member => {
      if (member.isFrozen && member.freezeEndDate) {
        if (now >= member.freezeEndDate.toDate()) {
          console.log(`Auto-resuming member ${member.id}`);
          resumeMembership(member.id).catch(console.error);
        }
      }
    });
  }, [members]);

  const archiveExpiredMembers = async () => {
    const now = new Date();
    const fifteenDaysAgo = new Date(now.setDate(now.getDate() - 15));
    
    members.forEach(async (member) => {
      if (member.membershipExpiry) {
        const expiry = member.membershipExpiry.toDate();
        if (expiry < fifteenDaysAgo && member.status !== 'Archived') {
          // Move to past_members
          await setDoc(doc(db, 'past_members', member.id), {
            ...member,
            archivedAt: Timestamp.now(),
            status: 'Archived'
          });
          await deleteDoc(doc(db, 'members', member.id));
        }
      }
    });
  };


  const rejectRequest = async (requestId) => {
    await updateDoc(doc(db, 'requests', requestId), { status: 'Rejected' });
  };

  // Staff Actions
  const signUpStaff = async (staffData) => {
    const staffId = `STF${Math.floor(10000 + Math.random() * 90000)}`;
    const newStaff = {
      id: staffId,
      name: staffData.name,
      phoneNumber: staffData.phoneNumber,
      password: staffData.password,
      slots: staffData.slots || [],
      createdAt: Timestamp.now()
    };
    await setDoc(doc(db, 'staff', staffId), newStaff);
    return staffId;
  };

  const updateStaff = async (id, updates) => {
    await updateDoc(doc(db, 'staff', id), updates);
  };

  const deleteStaff = async (id) => {
    await deleteDoc(doc(db, 'staff', id));
  };

  const parseSlotString = (slotStr) => {
    const parts = slotStr.split(' to ');
    if (parts.length !== 2) return null;
    
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.trim().split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }
      return { hours, minutes };
    };

    try {
      const start = parseTime(parts[0]);
      const end = parseTime(parts[1]);
      return { start, end };
    } catch (e) {
      console.error("Error parsing slot time", e);
      return null;
    }
  };

  const getSlotTimeRange = (slotStr, date = new Date()) => {
    const parsed = parseSlotString(slotStr);
    if (!parsed) return null;
    
    const startTime = new Date(date);
    startTime.setHours(parsed.start.hours, parsed.start.minutes, 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(parsed.end.hours, parsed.end.minutes, 0, 0);
    
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
    
    const lateTime = new Date(startTime);
    lateTime.setMinutes(startTime.getMinutes() + 15);
    
    return { startTime, endTime, lateTime };
  };

  const markStaffAttendance = async (staffMember) => {
    try {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      
      let matchedSlot = null;
      let checkInStatus = 'Present';
      let remarks = 'Checked in on time';

      for (const slot of (staffMember.slots || [])) {
        const range = getSlotTimeRange(slot, now);
        if (!range) continue;

        // Allow check in from 15 minutes before slot start to slot end
        const checkInAllowedStart = new Date(range.startTime);
        checkInAllowedStart.setMinutes(checkInAllowedStart.getMinutes() - 15);

        if (now >= checkInAllowedStart && now <= range.endTime) {
          matchedSlot = slot;
          if (now > range.lateTime) {
            checkInStatus = 'Late';
            remarks = `Checked in late at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          } else {
            checkInStatus = 'Present';
            remarks = 'Checked in on time';
          }
          break;
        }
      }

      if (!matchedSlot) {
        return { success: false, message: 'No active slot found for you at this time. Check-in is allowed from 15 minutes before slot start.' };
      }

      // Check if already checked in for this slot today
      const q = query(
        collection(db, 'staff_attendance'),
        where('staffId', '==', staffMember.id),
        where('date', '==', todayStr),
        where('slot', '==', matchedSlot)
      );
      const existing = await getDocs(q);
      if (!existing.empty) {
        return { success: false, message: `Attendance already marked for slot "${matchedSlot}" today.` };
      }

      const newEntry = {
        staffId: staffMember.id,
        staffName: staffMember.name,
        date: todayStr,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        checkedInAt: Timestamp.now(),
        slot: matchedSlot,
        status: checkInStatus,
        remarks: remarks
      };

      await addDoc(collection(db, 'staff_attendance'), newEntry);
      return { success: true, message: `Attendance marked as ${checkInStatus.toUpperCase()} for slot: ${matchedSlot}` };

    } catch (error) {
      console.error('Mark Staff Attendance Error:', error);
      return { success: false, message: `System Error: ${error.message}` };
    }
  };

  const value = {
    members,
    plans,
    attendance,
    requests,
    staff,
    staffAttendance,
    loading,
    addMember,
    updateMember,
    deleteMember,
    addPlan,
    markAttendance,
    submitRequest,
    approveRequest,
    resumeMembership,
    archiveExpiredMembers,
    rejectRequest,
    signUpStaff,
    updateStaff,
    deleteStaff,
    markStaffAttendance,
    getSlotTimeRange,
    recordPayment
  };

  return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
};
