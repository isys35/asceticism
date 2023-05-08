from fastapi import APIRouter, Depends, Request, Response
from starlette.requests import Request

from asceticism.core.auth import get_current_active_user
from asceticism.db.crud import create_ascesa, get_my_asces, complete_ascesa
from asceticism.db.session import get_db
from asceticism.db.schemas import Ascesa, AscesaOut

asces_router = router = APIRouter(prefix="/api/v1")


@router.post(
    "/asces", response_model=AscesaOut, response_model_exclude_none=True
)
async def ascesa_create(
    request: Request,
    ascesa: Ascesa,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Create ascesa
    """
    return create_ascesa(db, ascesa, current_user)


@router.post("/asces/{ascesa_id}/complete", response_model=AscesaOut)
async def ascesa_complete(
    request: Request,
    ascesa_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Complete ascesa
    """
    return complete_ascesa(db, ascesa_id, current_user)


@router.get(
    "/asces", response_model=list[AscesaOut], response_model_exclude_none=True
)
async def asces_list(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    List asces
    """
    return get_my_asces(db, current_user)
