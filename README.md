# Ivymoda

Ecommerce website Ivymoda using React Js (TypeScript)

## Requirements

- Node.js (Version v18.13.0 or later)
- npm (Version 8.19.3 or later)

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/duongtrungnguyenrc/IVYmodaClient.git
cd project-downloaded-path
```

Or download in: https://github.com/duongtrungnguyenrc/IVYmodaClient

### 2. Configuration

```bash
npm install
```
### 3. Start application

```bash
npm run dev
o
```

### NOTE: Default PORT when programe started is 5173:


Access http://localhost:5173 or input 'o' in terminal window of running program to quick access


# II. Project short explanation

## 1. Technology:

  - Client side: ReactJS (TypeScript)
    - Pakage manager: npm JS
    - Build tool: Vite 
    - Benefits of Using ReactJS (Client-Side):
      - Highly interactive user interface: ReactJS allows flexible, dynamic, and highly interactive user interfaces. Changing the application's state is easier and more efficient, resulting in a better user experience.
      - High performance: ReactJS efficiently updates the Document Object Model (DOM) using the Virtual DOM, enhancing performance and reducing the load on the browser.
      - Code reusability and easy maintenance: React's component-based structure allows for separation of concerns between logic and presentation, enabling easier code reuse and maintenance.
        
  - Server side: Spring Boot
    - Pakage manager: Maven
    - Build tool: Maven
    - Benefits of Using Spring Boot (Server-Side):
      - Building RESTful APIs: Spring Boot provides an excellent environment for swiftly and easily building RESTful APIs.
      - Security and handling complex logic: Spring Boot supports robust security mechanisms and complex logic handling capabilities.
      - Data management and database handling: Spring Boot simplifies database connectivity and management, providing various features and libraries for efficient data operations.
        
## 2. Application architecture: 

- Archtecture: Client - Server
  - Benefits of Combining ReactJS and Spring Boot with Client - Server architecture:
    - Clear separation of responsibilities: ReactJS handles user interface and interaction, while Spring Boot manages logic, data, and security. This clear separation aids in better management and development.
    - Flexible development environment: Allows independent development of front-end and back-end by separate teams, increasing flexibility and development speed.
    - Performance optimization: Using ReactJS and Spring Boot can optimize application performance with a flexible user interface and powerful APIs.
    - The combination of ReactJS and Spring Boot facilitates the development of high-performance applications that are easily maintainable and scalable, offering users an excellent experience and robust server-side logic handling.
    
- Entity relationship diagram:
<img width="982" alt="Screenshot 2023-12-01 at 01 50 43" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/3d9bb036-cb21-4629-966f-dc7bd72eb3b8">

---
***

# III. Project structure description:

## 1. Client side:

- public: Include public resources
- src: Main source
    - components: Include all ReactJS UI components
    - constants: Include all constants
    - layouts: Include all page shared layouts
    - models: Include all data model define
    - services: Include all general service to define logic
        
## 2. Server side:
- configuration
  - jwt: Json web token configuration
  - security: Spring security configuration
    - services: Spring security services
- controller: spring Restful api controller to define end-points, router in MVC model
- mapping: Include all mapping class to map from database entity to data transfer object
- model: Include all data model define class
  - dto: Include all data transfer object class to define data use in any case
  - entity: Include all Spring data JPA entity to define database table and relationship
  - enumeration: Include all set of constants
  - request: Include all request data define from client
  - response: Include all response data define
- repository: Include all JPA repository to interactive with database
- service: Include all service to handle logic and database interactions

---
***

# V. Functions Description:

## 1. Register account function

![Screenshot 2023-11-26 at 12 51 22](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d9280a6f-a33f-4e02-a8e2-afefde947b45)
- End-point: /api/auth/register
- Method: POST
- Pre authorize: No
- Payload: 
  - Request body: New user information
  <img width="1252" alt="Screenshot 2023-11-26 at 12 58 44" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/3541a11b-b37a-4535-b93d-3fbad8d859d0">

#### Success case response:

- Response: New user
<img width="1251" alt="Screenshot 2023-11-26 at 12 59 00" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/9338bd84-db7a-4881-9d79-7bfbc64a0f3b">

#### Failed case response:

- Email already exists:
<img width="1252" alt="Screenshot 2023-11-26 at 13 06 39" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/bf63b79c-6e1e-4645-8354-a85f6e438228">

- Lack of information:
<img width="1247" alt="Screenshot 2023-11-26 at 13 07 54" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/34c44197-021e-45e0-92a6-a90108b21231">

- Invalid method:
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

## 2. Login function

![Screenshot 2023-11-26 at 13 10 54](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/b647f5bd-1cad-4f0a-b8ac-cb9c2ad1e044)

- End-point: /api/auth/login
- Method: POST
- Pre authorize: No
  
- Request body:
<img width="1251" alt="Screenshot 2023-11-26 at 13 11 19" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ee336c9a-2020-4167-84d1-2a3417d232a7">

#### Success case response:

- Response: Authorization information
  - With ADMIN user
  <img width="1233" alt="Screenshot 2023-11-26 at 13 12 01" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/c839afda-ed88-4f90-947c-129cee081d36">
  
  - With Normal user
  <img width="1247" alt="Screenshot 2023-11-26 at 13 13 00" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/334f235b-ac5f-4666-a6a6-ba09a14c0eef">

#### Failed case response:

- Invalid login information
<img width="1256" alt="Screenshot 2023-11-26 at 13 13 34" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/51122271-666d-4de8-8e40-c49bef1817f6">

- Lack of information
<img width="1234" alt="Screenshot 2023-11-26 at 13 13 55" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/27b9c037-1d37-4d17-bc3c-5ddaf6220b2f">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

## 3. Get product function

![Screenshot 2023-11-26 at 13 17 26](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/eea5f278-42d0-4031-96b6-7a36f3cd089c)
- End-point: api/product/all
- Method: GET
- Pre authorize: No

### + With default no filter:
- Query parameter: page, limit
- value: current fetching page, limit products per page
  <img width="1247" alt="Screenshot 2023-11-26 at 13 22 20" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/e326a4ba-5af0-4581-acb2-72929a19bf9c">
  
#### Success case response

- Response: Default are all products with pagination
  <img width="1255" alt="Screenshot 2023-11-26 at 13 23 58" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/06b9857c-6e08-44ac-8894-39916154ce2c">

#### Failed case response:
- Lack of require parameters
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

  
---
### + Filter by product group:
- Query parameter
<img width="1249" alt="Screenshot 2023-11-26 at 13 26 58" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/15f3a3e1-981b-45cc-bc01-d37af3accb89">

#### Success case response

- Response: All products whose group matches the parameter
<img width="1231" alt="Screenshot 2023-11-26 at 13 27 20" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ac66210b-8de1-4579-82e7-5b05c4722936">

#### Failed case response:
- Lack of require parameters
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---
### + Filter by product category
- Query parameter
<img width="1252" alt="Screenshot 2023-11-26 at 14 33 52" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/b96153e1-a558-40e4-a678-112f806f31a8">

#### Success case response

- Response: All products whose group and category matches the parameter
- <img width="1254" alt="Screenshot 2023-11-26 at 14 34 29" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/517f2a99-75dc-4632-a5c5-6513c25261c6">

#### Failed case response:
- Lack of require parameters
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

### + Filter By Color
- Query parameter
![Color Query Parameter](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/0a4e7d90-ab16-43f3-af87-514108cf5432)

#### Success case response

- Response: Products with the color specified in the parameter
![Color Filter Response](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/69a05abf-5105-418a-aa17-ce7a1451128c)

#### Failed case response:
- Lack of require parameters
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

### + Filter By Size
- Query parameter: <size>
- Value: Size name
![Size Query Parameter](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/2f7ee4c0-e6a8-4e19-867b-0fd13ff558a1)

- Response: Products with the size specified in the parameter

---

### + Filter By Tag
- Query parameter
![Tag Query Parameter](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/014946ac-b707-4f9a-9678-4ac1b1e8457f)

#### Success case response

- Response: Products based on the tag provided in the parameter
![Tag Filter Response](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/1421cace-7ff4-480f-ad59-30a328b62702)

#### Failed case response:
- Lack of require parameters
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

### + Filter By Price Range
- Query parameter
![Price Range Query Parameter](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/6d65564f-bd8f-446b-b628-6930b423713f)

#### Success case response

- Response: Products within the price range specified
![Price Range Filter Response](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/a16c1342-43f2-4c3a-bbfb-0d6ae5a4bc5d)


#### Failed case response:
- Lack of require parameters
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

### + Include all filter
- Query parameter
<img width="1250" alt="Screenshot 2023-11-26 at 15 28 36" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/2686918c-4c0c-44d2-a039-28796a12dacc">

#### Success case response

- Response: All product matches filter
<img width="1253" alt="Screenshot 2023-11-26 at 15 29 35" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/981a32fe-c552-4d4d-a547-ee7c1db7abe2">


#### Failed case response:
- Lack of require parameters
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

## 4. Get product details function: 

![Screenshot 2023-11-26 at 17 52 54](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/559a52e9-c04f-4fa8-9dbc-afcc5fb367e8)

- End-point: api/product/detail
- Method: GET
- Pre authorize: No
- Payload:
  - Include required request parameter: Product id
  <img width="867" alt="Screenshot 2023-11-26 at 18 04 58" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d3767b74-e77b-4b77-8a87-0a8e0262cdc2">

#### Success case response:

- Response: product detail
<img width="865" alt="Screenshot 2023-11-26 at 17 56 18" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/7a5c9483-5e70-4162-aa91-d947fa2b6677">

#### Failed case response:
- Lack of require parameters
<img width="864" alt="Screenshot 2023-11-26 at 17 56 56" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/44c92654-a896-47d3-83ab-3f6e443122a6">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

## 5. Add new product function: 

<img width="1680" alt="Screenshot 2023-11-26 at 15 31 52" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/992abd49-581f-4489-8f12-f462b02792fd">

- End-point: api/product/add
- Method: POST
- Pre authorize: ROLE_ADMIN
- Payload: 
  - Include headers authorization token: String bearer token
  <img width="1256" alt="Screenshot 2023-11-26 at 15 45 22" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ed7d5453-6538-4373-8760-323d36e878f8">
  
  - Include required request body: Product data object
  <img width="1252" alt="Screenshot 2023-11-26 at 15 42 20" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/0b52ef3f-1fb1-4f09-a1e5-5b6cb56b8b1b">

#### Success case response:

- Response: created product
<img width="1250" alt="Screenshot 2023-11-26 at 15 47 52" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/f8812d36-dbc7-4c06-9417-bec2ca0d52f8">

#### Failed case response:

- Invalid token
<img width="1256" alt="Screenshot 2023-11-26 at 15 49 03" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ea14bbe4-6d75-40c9-97ed-0f3538e301f9">

- Invalid product information
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

- Does not have permission
<img width="1254" alt="Screenshot 2023-11-26 at 19 31 11" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/37c0d4cb-2109-47a1-9c7f-da7d764f4104">

---

## 6. Delete product function:

<img width="1678" alt="Screenshot 2023-11-26 at 16 08 04" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/81d8db12-e3ef-4cd4-94b4-2b3b5cb04967">

- End-point: api/product/delete
- Method: POST
- Pre authorize: ROLE_ADMIN
- Payload: 
  - Include headers authorization token: String bearer token
  <img width="1251" alt="Screenshot 2023-11-26 at 16 10 58" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/522aa6f4-2de5-49e7-92cd-b122c8340bc0">
  
  - Include requireed request body: product id object
  <img width="1249" alt="Screenshot 2023-11-26 at 16 11 52" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/21129cf6-f428-48b1-bd3c-aebb23f7b4c7">

#### Success case response:

- Response: delete status
<img width="1253" alt="Screenshot 2023-11-26 at 16 12 04" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/656e5f8b-754c-48b4-ac0f-cc7f4bb61d35">

#### Failed case response:

- Invalid token
<img width="1256" alt="Screenshot 2023-11-26 at 15 49 03" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ea14bbe4-6d75-40c9-97ed-0f3538e301f9">

- Invalid product information
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

- Does not have permission
<img width="1254" alt="Screenshot 2023-11-26 at 19 31 11" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/37c0d4cb-2109-47a1-9c7f-da7d764f4104">

---

## 7. Update product function:

<img width="1680" alt="Screenshot 2023-11-26 at 16 15 51" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/1c4d0c30-65c8-4f34-a1a3-3309fc5fb2d5">

- End-point: api/product/update
- Method: POST
- Pre authorize: ROLE_ADMIN
- Payload: 
  - Include headers authorization token: String bearer token
  <img width="1254" alt="Screenshot 2023-11-26 at 16 23 29" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/fe8f21c0-206b-453c-9fec-f3179ab4b94d">

  - Include required request body: updating product object
  <img width="1251" alt="Screenshot 2023-11-26 at 16 25 23" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/a8872080-aebb-42af-bbf2-056c87b51253">

#### Success case resonse:

- Response: updated product information
<img width="1253" alt="Screenshot 2023-11-26 at 16 25 34" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/6e1e7c54-5e6c-4e63-b947-44dddeab6fb0">

#### Failed case response:

- Invalid token
<img width="1256" alt="Screenshot 2023-11-26 at 15 49 03" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ea14bbe4-6d75-40c9-97ed-0f3538e301f9">

- Invalid product information
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

- Does not have permission
<img width="1254" alt="Screenshot 2023-11-26 at 19 31 11" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/37c0d4cb-2109-47a1-9c7f-da7d764f4104">

---

## 8. Get Filter options function:

![Screenshot 2023-11-26 at 19 07 21](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/9ba96651-3bf1-41e2-bc5e-aa9f659144f3)
- End-point: api/product/filter
- Method: GET
- Pre authorize: No
- Payload: No

#### Success case resonse:

- Response: All filter method 
<img width="1233" alt="Screenshot 2023-11-26 at 19 10 10" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/cd917142-dd95-4432-8a98-7ba67cde60f7">

#### Failed case response:

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

## 9. Get all orders

![Screenshot 2023-11-26 at 19 15 56](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/4f864bcb-b4e7-4e62-8fea-2f997c966af4)

- End-point: api/order/all
- Method: GET
- Pre authorize: ROLE_ADMIN
- Payload:
  - Include header: String bearer token
  <img width="1248" alt="Screenshot 2023-11-26 at 19 19 24" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/86cdb9ce-24ff-4125-83dd-8cca12d301ff">
  
  - Require request parameters: page and limit
  <img width="1253" alt="Screenshot 2023-11-26 at 19 19 53" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/74667d29-aedf-4e2b-ad7f-d12bd156880f">

#### Success case resonse:

- Response: All orders
<img width="1245" alt="Screenshot 2023-11-26 at 19 20 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/880a3c84-fac9-475b-9576-aa0a84a8d1aa">

#### Failed case response:

- Invalid token
<img width="1256" alt="Screenshot 2023-11-26 at 15 49 03" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ea14bbe4-6d75-40c9-97ed-0f3538e301f9">

- Invalid params
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

- Does not have permission
<img width="1254" alt="Screenshot 2023-11-26 at 19 31 11" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/37c0d4cb-2109-47a1-9c7f-da7d764f4104">

---

## 10. create order

- Add product to cart (Using cookie on client side):
![Screenshot 2023-11-26 at 19 25 12](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/11483c49-a47f-4539-aaa0-e14e9cfe2cef)

- View cart:
![Screenshot 2023-11-26 at 19 25 48](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/026c4396-d841-400b-8a96-a2cf975e9208)

- Confirm order:
![Screenshot 2023-11-26 at 19 26 15](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/96d0dd84-aac4-43f0-a337-10987a42bddf)

- End-point: api/order/create
- Method: POST
- Pre authorize: ROLE_ADMIN
- Payload:
  - Include request header: String authorization token
  <img width="1256" alt="Screenshot 2023-11-26 at 19 33 32" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/1f67ee02-af25-4081-a852-40a60c7c3a30">

  - Include request body: New order object
  <img width="1262" alt="Screenshot 2023-11-26 at 19 34 09" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ac5d459d-f433-42d3-8c13-8cc11638858f">

#### Success case resonse:

- Response: New order
<img width="1241" alt="Screenshot 2023-11-26 at 19 37 40" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/7a6f0890-7296-4a74-86ce-67de23bf7583">

#### Failed case response:

- Invalid token
<img width="1256" alt="Screenshot 2023-11-26 at 15 49 03" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ea14bbe4-6d75-40c9-97ed-0f3538e301f9">

- Invalid information
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

- Does not have permission
<img width="1254" alt="Screenshot 2023-11-26 at 19 31 11" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/37c0d4cb-2109-47a1-9c7f-da7d764f4104">

---

## 11. Confirm order

![Screenshot 2023-11-26 at 19 40 29](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/938ce21e-f89b-4eec-a319-4b7ed4c53454)
![Screenshot 2023-11-26 at 19 41 39](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/41ba6bda-f891-4f7d-be4a-2348b59132bc)

- End-point: api/order/confirm
- Method: POST
- Pre authorize: ROLE_ADMIN
- Payload:
  - Include request header: String authorization token
  <img width="1256" alt="Screenshot 2023-11-26 at 19 44 48" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/5a42824b-0aad-4048-9fe4-0ef9a1c20599">
  
  - Include request body: Order id object
  <img width="1251" alt="Screenshot 2023-11-26 at 19 45 09" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/7ae5485f-a9c1-4288-b1c2-7c3826e4ef08">

#### Success case resonse:

- Response: Confirm status
<img width="1249" alt="Screenshot 2023-11-26 at 19 43 32" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/9555649e-bc3c-46b9-bc02-32248374b6f6">

#### Failed case response:

- Invalid token
<img width="1256" alt="Screenshot 2023-11-26 at 15 49 03" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ea14bbe4-6d75-40c9-97ed-0f3538e301f9">

- Invalid information
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

- Does not have permission
<img width="1254" alt="Screenshot 2023-11-26 at 19 31 11" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/37c0d4cb-2109-47a1-9c7f-da7d764f4104">

---

## 12. Reject order

![Screenshot 2023-11-26 at 19 48 13](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/5e4f9448-e22c-448b-a060-00fe5a96fef8)
![Screenshot 2023-11-26 at 19 48 26](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/03bd5370-9631-4be7-8d17-026e65d8501d)

- End-point: api/order/confirm
- Method: POST
- Pre authorize: ROLE_ADMIN
- Payload:
  - Include request header: String authorization token
  <img width="1254" alt="Screenshot 2023-11-26 at 19 49 41" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/fbc0bc75-f6ce-48ac-85b9-c98ea5e5030b">

  - Include request body: Order id object
  <img width="1254" alt="Screenshot 2023-11-26 at 19 49 52" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/cf2a8fb0-7aef-4b41-b776-600dc03ce046">

#### Success case resonse:

- Response: Reject status
<img width="1253" alt="Screenshot 2023-11-26 at 19 50 10" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/75d3eaed-e785-4998-9eec-9c2e62250a9b">

#### Failed case response:

- Invalid token
<img width="1256" alt="Screenshot 2023-11-26 at 15 49 03" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/ea14bbe4-6d75-40c9-97ed-0f3538e301f9">

- Invalid information
<img width="1239" alt="Screenshot 2023-11-26 at 15 49 30" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/d09fe89d-ad8e-4697-8984-0fcffd74944e">

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

- Does not have permission
<img width="1254" alt="Screenshot 2023-11-26 at 19 31 11" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/37c0d4cb-2109-47a1-9c7f-da7d764f4104">

---

## 13. Show gallery

![Screenshot 2023-11-26 at 19 51 31](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/24789de0-6343-4468-ab2b-5d57a43d4e43)

- End-point: api/gallery/all
- Method: GET
- Pre authorize: No
- Payload: No

#### Success case response:

- Response: Gallery
<img width="1265" alt="Screenshot 2023-11-26 at 19 53 55" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/b5a26086-6772-4b3b-a4d6-5ebd890aad37">

#### Failed case response:

- Invalid method
<img width="1251" alt="Screenshot 2023-11-26 at 13 18 57" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/831196bd-fe62-4781-b5fe-760938751c4a">

---

## 14: Show group & category

![Screenshot 2023-11-26 at 19 57 46](https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/499b5ca6-10ac-4c6d-9da8-30a1536db3e6)

- End-point: api/product-group/all
- Method: GET
- Pre authorize: No
- Payload: No

#### Success case response:

- Response: Category list
<img width="1252" alt="Screenshot 2023-11-26 at 19 58 34" src="https://github.com/duongtrungnguyenrc/SpringCommerceServer/assets/111481047/15cd74e9-3ea8-430d-a8c9-f87acccaf8ac">
