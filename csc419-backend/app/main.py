from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, suppliers, products, orders, orderitems, auth

app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Your local dev server
        "http://localhost:3000",  # Alternative local port
        # Add your production frontend URL here when deployed
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
