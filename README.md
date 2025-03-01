# Third party Advisor Portal - Password Reset Improvement

## Project Overview

This project aims to improve the password reset experience for third-party advisors accessing our portal. 
Currently, the process is cumbersome, leading to frustration and potential loss of productivity. 
We will explore and implement more user-friendly password reset mechanisms, focusing on enhanced security and ease of use.

## Problem Statement

Third-party advisors are experiencing difficulties with the current password reset process. 
This is impacting their ability to access the portal efficiently.

## Proposed Solutions

We will investigate and implement the following solutions to address the password reset issue:

* **Multi-Factor Authentication (MFA):**
    * Implement MFA to add an extra layer of security during the password reset process.
    * Explore options such as SMS verification, email verification, or authenticator app integration.
* **Magic Links:**
    * Implement magic links to provide a seamless and passwordless login experience.
    * Generate unique, time-sensitive links that are sent to the advisor's email address.
    * Upon clicking the link, the advisor is automatically logged in or directed to a password reset page.
* **Apigee Integration:**
    * Leverage our existing Apigee infrastructure to manage and secure the password reset process.
    * Utilize Apigee policies for authentication, authorization, and rate limiting.
    * Apigee will be used to secure and manage the API calls relating to the chosen password reset method.

## Project Goals

* Simplify the password reset process for third-party insurance advisors.
* Enhance the security of the password reset process.
* Reduce the number of support requests related to password resets.
* Implement a solution that integrates well with our existing Apigee infrastructure.

## Technologies

* Node.js (for backend development)
* Apigee (for API management and security)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/swapniltamse/advisor-portal-magic-link-mfa
    cd <project_directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    * Set up the necessary environment variables, such as API keys and database connection strings.
4.  **Run the application:**
    ```bash
    node index.js
    ```
    (or your main app file)
5.  **Apigee Configuration:**
    * Configure Apigee proxies to handle the new password reset endpoints.
    * Implement necessary policies for authentication, authorization, and security.

## Future Considerations

* Implement user feedback mechanisms to continuously improve the password reset experience.
* Explore other advanced authentication methods, such as biometric authentication.
* Implement detailed logging and monitoring of the password reset process.

## Contact

For any questions or issues, please contact:

[Your Name/Team Email]
