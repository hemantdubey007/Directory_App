# Directory App

This web application allows users to manage and retrieve personal information. It provides two main functionalities: adding new person details and retrieving information based on Aadhar Number.

## Features

- Add New Person: Add new person details including Name, Date of Birth, Aadhar Number, Mobile Number, and Age.
- Retrieve Information: Retrieve person details based on Aadhar Number.

## Technologies Used

- HTML
- CSS
- JavaScript

### Add New Person

1. Click on the "Add New Person" tab.
2. Click the "Add New Person" button to create a new row.
3. Fill in the details:
   - Name
   - Date of Birth
   - Aadhar Number (12 digits)
   - Mobile Number (10 digits)
   - Age will be automatically calculated based on Date of Birth.
4. Click "Save" to save the information in local storage.
5. Click "Delete" to remove the row.

### Retrieve Information

1. Click on the "Retrieve Information" tab.
2. Enter the Aadhar Number.
3. Click "Retrieve" to see the details.
4. If a match is found, the details will be displayed. If no match is found, a message will be shown.

## Validation

- Aadhar Number must be 12 digits.
- Mobile Number must be 10 digits.
- All fields must be filled before saving.
