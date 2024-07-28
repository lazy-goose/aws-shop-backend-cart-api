CREATE TYPE cart_statuses AS ENUM ('OPEN', 'ORDERED');
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status cart_statuses NOT NULL DEFAULT 'OPEN'
);

CREATE TABLE cart_items (
    PRIMARY KEY (cart_id, product_id),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    count INTEGER NOT NULL CHECK (count > 0)
);