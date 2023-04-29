"""migration

Revision ID: 00e71138a48e
Revises: e1e7deebf6fe
Create Date: 2023-04-25 09:47:02.562080

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '00e71138a48e'
down_revision = 'e1e7deebf6fe'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('ascesa', sa.Column('days', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('ascesa', 'days')
    # ### end Alembic commands ###