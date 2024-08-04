INSERT INTO orders (user_id, cart_id, payment, delivery, comments, status, total)
VALUES
    (
        '702ac479-4238-4691-a7c5-9a916ac7bae6',
        '8adcae67-2285-4115-bca4-8321dbbcef84',
        '{"type": "credit_card", "creditCard": {"number": "4111111111111111", "expiry": "12/25"}}',
        '{"type": "home", "address": {"street": "123 Main St", "city": "Minsk", "zip": "12345"}}',
        'I will take it by myself.',
        'ORDERED',
        100.00
    ),
    (
        'dac90490-90fe-4cf7-bf95-c68dd8949398',
        '40be198a-7b6c-4615-b622-e22497b3989c',
        '{"type": "credit_card", "creditCard": {"number": "4111111111111111", "expiry": "12/25"}}',
        '{"type": "home", "address": {"street": "123 Main St", "city": "Anytown", "zip": "12345"}}',
        'Please leave at the front door.',
        'ORDERED',
        100.50
    ),
    (
        '269f855d-5a6d-4251-b81d-aa241a9f6427',
        '64cbd8ff-960e-4202-8a15-4b9469c8b048',
        '{"type": "paypal"}',
        '{"type": "home", "address": {"street": "456 Elm St", "city": "Othertown", "zip": "67890"}}',
        'Ring the doorbell.',
        'ORDERED',
        150.75
    ),
    (
        '5ff0a5fe-f1fe-4005-89b6-08948bd5340c',
        'a3575d98-662a-4637-ba35-47425a293d92',
        '{"type": "credit_card", "creditCard": {"number": "4222222222222222", "expiry": "11/24"}}',
        '{"type": "work", "address": {"street": "789 Oak St", "city": "Somewhere", "zip": "10101"}}',
        'Leave in the mailbox.',
        'ORDERED',
        200.00
    ),
    (
        '09c4cbe3-a7fe-4283-a883-e190bb8336b8',
        '83ee4c08-c2b1-4fab-8075-cac99a6ec59e',
        '{"type": "credit_card", "creditCard": {"number": "4333333333333333", "expiry": "10/23"}}',
        '{"type": "home", "address": {"street": "654 Maple St", "city": "Oldtown", "zip": "40404"}}',
        'Call on arrival.',
        'ORDERED',
        250.25
    ),
    (
        '5075c4da-bbd4-43e3-a80c-53c997f173fd',
        'ece4800c-15a0-48cd-8292-b9127270a7ba',
        '{"type": "bank_transfer", "address": {"street": "409 Money St"}}',
        '{"type": "home", "address": {"street": "321 Pine St", "city": "Newplace", "zip": "30303"}}',
        'Hand over to the security guard.',
        'ORDERED',
        300.50
    );