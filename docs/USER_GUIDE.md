# Taleem Gym User Guide & Operational Manual

Welcome to the **Taleem Gym Management System** operational manual. This guide explains how to use the different sections of the Progressive Web App (PWA) tailored to Gym Owners (Admins), Gym Members, and Gym Staff.

---

## 🔑 User Roles & Authentication

The application features three distinct dashboards. Access is determined by your account role configuration during login:

1. **Gym Admin / Owner**: Accesses member records, payment systems, plan configs, staff, and overall gym analytics.
2. **Gym Member**: Accesses their membership details, checks attendance logs, pays renewals, and manages membership freezes.
3. **Gym Staff / Trainer**: Accesses attendance sheets and scans member check-in QR codes.

---

## 🖥️ Admin Dashboard (Owner Manual)

The Admin panel is designed for desktop and mobile, giving owners total control over gym operations.

### 1. Dashboard Overview
* **Key Metrics**: Instantly view Total Active Members, Expired memberships, Daily Attendance Count, and Monthly Revenue (Combined Offline & Online).
* **Alert Center**: Displays automatic warnings for memberships expiring within 7 days, payment issues, or system events.

### 2. Member Management
* **Adding Members**: Navigate to `Members` > `Add New`. Input name, phone, starting date, and assign a membership plan.
* **Member Status**:
  * `Active`: Member is allowed gym access.
  * `Expired`: Membership duration has passed. Gym entry will be blocked.
  * `Frozen`: Membership is paused. Entry is blocked, but the expiry date is extended.
* **Searching**: Use the search bar in the Member List to search instantly by name or phone number.

### 3. Subscription & Plans
* **Plan Configuration**: Setup packages in the `Plans` section (e.g., Monthly, Quarterly, Semi-Annual, Annual).
* **Setting Rates**: Define the pricing and duration (in months) for each plan.
* **Plan Assigning**: Instantly assign or upgrade a member's plan from their profile page.

### 4. Payment Recording
* **Offline Payments**: For cash, check, or direct bank UPI transfers. Search the member, select "Record Payment", input the amount, select the method, and mark as "Paid".
* **Online Payments**: Send payment links directly to members. The status automatically updates to "Success" in the admin log once they pay.

### 5. Staff Management
* Register trainers and front-desk employees. Set their permissions and track their work activity logs.

---

## 📱 Member Dashboard (Client Manual)

Gym members can install the application on their Android or iOS device to manage their gym routine on the go.

### 1. Daily Check-In (QR Code Attendance)
* **Scanning at Front Desk**:
  1. Open the app on your mobile.
  2. Tap **Scan Code** / **Show QR Code**.
  3. Point the scanner at the gym desk QR, or show your member QR code to the staff terminal to instantly log your attendance for the day.
* **Attendance History**: View your calendar of completed gym days to track consistency.

### 2. Membership Renewal & Online Payments
* **Renewing Plans**: When your membership is expiring or expired, a prompt appears.
* **Selecting a Package**: Tap **Renew**, choose your desired plan (e.g. 3 Months), and click **Pay Online**.
* **Payment Gateway**: Secure checkout via integrated gateways (Stripe/Razorpay). Once successful, your membership status resets to `Active` instantly.

### 3. Freezing Your Membership
* **How it works**: If you are traveling or injured, you can temporarily pause your membership validity.
* **Rules**:
  * Fee: A small maintenance fee (e.g., ₹200) applies.
  * Maximum duration: Up to 15 days per freeze cycle.
  * Expiry Extension: Your membership expiry date is extended by the exact number of days frozen.
  * Access: Gym access is disabled during the frozen period.
* **To Freeze**: Go to **Profile** > **Membership Status** > **Freeze Membership**, enter the duration, and confirm.

---

## 📋 Staff Dashboard (Trainer Manual)

Trainers and desk employees use this interface to speed up daily gym check-ins.

### 1. Member QR Scanner
* Tap **Launch Scan Scanner**.
* Use your device's camera to scan the member's mobile screen QR code.
* The system displays:
  * **Green screen**: Access Granted (Member is active).
  * **Red screen**: Access Denied (Membership expired or frozen).

### 2. Manual Attendance Log
* If a member does not have their phone, search their name in the staff panel and click **Mark Attendance** manually.
