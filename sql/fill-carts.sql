INSERT INTO carts (id, user_id, created_at, updated_at, status) 
VALUES
    ('8adcae67-2285-4115-bca4-8321dbbcef84', '702ac479-4238-4691-a7c5-9a916ac7bae6', '2024-01-01', '2024-01-02', 'OPEN'),
    ('40be198a-7b6c-4615-b622-e22497b3989c', 'dac90490-90fe-4cf7-bf95-c68dd8949398', '2024-01-02', '2024-01-03', 'OPEN'),
    ('64cbd8ff-960e-4202-8a15-4b9469c8b048', '269f855d-5a6d-4251-b81d-aa241a9f6427', '2024-01-03', '2024-01-04', 'ORDERED'),
    ('a3575d98-662a-4637-ba35-47425a293d92', '5ff0a5fe-f1fe-4005-89b6-08948bd5340c', '2024-01-04', '2024-01-05', 'OPEN'),
    ('83ee4c08-c2b1-4fab-8075-cac99a6ec59e', '09c4cbe3-a7fe-4283-a883-e190bb8336b8', '2024-01-05', '2024-01-06', 'ORDERED'),
    ('ece4800c-15a0-48cd-8292-b9127270a7ba', '5075c4da-bbd4-43e3-a80c-53c997f173fd', '2024-01-06', '2024-01-07', 'OPEN');

INSERT INTO cart_items (cart_id, product_id, count) VALUES
    ('8adcae67-2285-4115-bca4-8321dbbcef84', 'daddf875-571a-48e5-8c0a-09d61941ee2c', 1),
    ('40be198a-7b6c-4615-b622-e22497b3989c', '24c5449d-6ea7-493d-b1f1-c13343b1741d', 1),
    ('64cbd8ff-960e-4202-8a15-4b9469c8b048', 'e61d4c5d-3200-4dd0-b375-7918d73fa51b', 4),
    ('a3575d98-662a-4637-ba35-47425a293d92', 'cc55a77f-60c1-4aa4-b920-2aff76c5d804', 3),
    ('83ee4c08-c2b1-4fab-8075-cac99a6ec59e', '6946abd1-c1c7-44d6-b76c-161a8693c7fd', 5),
    ('ece4800c-15a0-48cd-8292-b9127270a7ba', 'daddf875-571a-48e5-8c0a-09d61941ee2c', 2);