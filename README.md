# EasePense-App
## This is my term requirement for the course, CpE-9: Software Design using the ABCD method. EasePense is a simple E-commerce app for a small store we have.

## Get Started
Follow these steps to install and run the app:

### Prerequisites
- Node.js
Download and install Node.js from nodejs.org.

- MySQL
Download and install MySQL from mysql.com.
Make sure you have a running MySQL server and proper credentials set up in a .env file in the root of the project. Example:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD='your_pass'
DB_NAME=easepensedb
```

create `.env` by running this in your terminal: 
```
cat > .env <<EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD='your_pass'
DB_NAME=easepensedb
EOF
```

### Installation Steps

**(1) Clone the Repository**

Open your terminal and run:
```bash
git clone https://github.com/Adr-hyng/EasePense-App.git
cd EasePense-App
```

**(2) Install Dependencies**

The application is split into two parts: the client and the server. To install dependencies for both parts, run:

```bash
npm run build_app
```

This command will install the dependencies from both client/package.json and server/package.json.

**(3) Start the Application**

After installing dependencies, you have a couple of options to start the app:

- **Option 1**:
  
  Start both the client and server concurrently by running:

  ```
  npm run start_app
  ```

- **Option 2**:

  Build (install dependencies) first and then start the application by running:

  ```
  npm run start_build
  ```

### Application Functionality
✅ Add Items to Cart - Browse the Home page and add featured products or shop items to your cart.

✅ View and Manage Cart - Navigate to the Cart page to see the items you have added. You can:

> - Remove individual items using the "X" icon.
> - Clear all items from the cart. Note that clearing the cart deducts the items' stocks.

✅ Featured Products - Featured products will only show up in the top products section if they have been purchased many times.

✅ Pages Available - The Home page and the Add to Cart (Cart) page are the primary functionalities available.

Now you're ready to run and test the app!

## Home Page
![image](https://github.com/Adr-hyng/EasePense-App/assets/95139246/d28d0ccf-b9d0-40c4-8077-6b88c8e6937b)


<br>

## Cart Page
![image](https://github.com/Adr-hyng/EasePense-App/assets/95139246/ca418a59-0520-46cb-b880-557bbbbca048)



# Category:

- Utility Software ✅ 

# A: Awareness

- EasePense: Micro-Grocery Inventory Application

# B: Baseline (Resource / Knowledge):
- Visual Studio Code
- React and CSS (Front-End)
- NodeJS and Express (Back-End)
- Database (MySQL)
- Computer
- STRONG INTERNET

# C: Creative Solutions:
```
Contents:
- Algorithm Developed
- Flowcharting
- Database Design
- User Interface Design
- Gantt Charting
```
- Real-Time Product Processing
- Items Container 
- UX Friendly
- Add to Cart
- Total Expenses

# D: Documentation (WIP):

## **February**:
```
- Resource Gathering
- User Interface Prototype
```

## **March**:
```
- Learning NodeJS
- Learning CSS
```

## **April**:
```
- Learning React
- Learning SQL
```

XD
