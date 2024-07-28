CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    cart_id UUID NOT NULL REFERENCES carts(id),
    payment JSON NOT NULL,
    delivery JSON NOT NULL,
    comments TEXT,
    status TEXT NOT NULL,
    total INTEGER NOT NULL
);