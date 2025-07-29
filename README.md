Project Name: DonorSync
Live Site:  https://donorsyncruct12ph.netlify.app/ 

Purpose:
DonorSync is built to ensure that blood reaches those who need it most. The platform connects donors with patients in critical need, such as accident victims, surgery patients, and individuals with chronic illnesses. It helps prevent emergency shortages by promoting responsible and timely donations. DonorSync empowers users by allowing them to donate blood, manage requests, volunteer, or spread awareness. It encourages people to take real action within their local communities to support life-saving efforts.

Key Features:
The platform includes a blood donation request system where logged-in users can submit requests with details like recipient name, location, blood group, date, and time. The role-based user dashboard provides separate features for each user type. Donors can manage their own requests, including viewing, editing, marking as done, or canceling them. Volunteers can update the donation status of all requests. Admins have full access to manage all users, donation requests, and blog content.

Each user has a profile page where personal information is shown. The form is initially non-editable and can be updated by clicking an edit button. The email field remains non-editable at all times.

Donation requests are displayed in a structured table view with filters for status such as pending, in progress, done, or canceled. Actions like edit, view, delete, done, and cancel are provided accordingly. Donors can see their three most recent donation requests on the dashboard homepage and have the option to view all.

The platform also includes a content management section where admins and volunteers can create and manage blog content. Blogs can be drafted, published, or unpublished depending on role permissions. A rich text editor is used for creating blog posts.

Authentication is handled with Firebase, and secure authorization is enforced using JWT for protected API access and role-based routing. All dashboard pages are protected and mobile-responsive with a sidebar-based layout to ensure usability across all screen sizes.

Technologies and NPM Packages Used:
Firebase Authentication
JSON Web Token (JWT)
React Router DOM
Tailwind CSS
Framer Motion
Axios
TanStack React Query
React Context API
Jodit React (for blog editor)
SweetAlert2
React Toastify
Stripe 
Other utility libraries as needed for responsiveness, form handling, and secure communication.

