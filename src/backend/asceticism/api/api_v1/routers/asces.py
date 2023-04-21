from fastapi import APIRouter, Depends, Request, Response
from starlette.requests import Request

from asceticism.core.auth import get_current_active_user
from asceticism.db.crud import create_ascesa
from asceticism.db.session import get_db
from asceticism.db.schemas import Ascesa

asces_router = router = APIRouter(prefix="/api/v1")


@router.post("/asces", response_model=Ascesa, response_model_exclude_none=True)
async def user_create(
    request: Request,
    ascesa: Ascesa,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Create ascesa
    """
    return create_ascesa(db, ascesa, current_user)