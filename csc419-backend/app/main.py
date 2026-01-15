from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # [1] Add this import
from app.routers import users, suppliers, products, orders, orderitems, auth

app = FastAPI(debug=True)

# [2] Define the origins that are allowed to talk to your backend
origins = [
    "http://localhost:5173",           # Local Vite/React development
    "https://csc419group3project.vercel.app/" # Your live frontend URL (when deployed)
]

# [3] Add the middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],               # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],               # Allows all headers
)

@app.get("/")
def root():
    return {"status": "IWMS backend running"}

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(suppliers.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(orderitems.router)
