from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
import uvicorn

from asceticism.api.api_v1.routers.asces import asces_router
from asceticism.api.api_v1.routers.users import users_router
from asceticism.api.api_v1.routers.auth import auth_router
from asceticism.core import config
from asceticism.db.session import SessionLocal
from asceticism.core.auth import get_current_active_user

app = FastAPI(title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api")

origins = ["*"]


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(
    users_router,
    tags=["users"],
    dependencies=[Depends(get_current_active_user)],
)
app.include_router(auth_router, tags=["auth"])
app.include_router(asces_router, tags=["asces"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
