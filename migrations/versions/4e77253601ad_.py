"""empty message

Revision ID: 4e77253601ad
Revises: bb0382b56c4b
Create Date: 2023-09-21 13:12:54.305272

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e77253601ad'
down_revision = 'bb0382b56c4b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order_product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('extras', sa.JSON(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order_product', schema=None) as batch_op:
        batch_op.drop_column('extras')

    # ### end Alembic commands ###
