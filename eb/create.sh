#!/bin/sh -e

ENV_NAME="${1:-lazy-goose-cart-api-develop}"

envvars() {
    cat "`dirname -- $0`/../.env" |
        sed '/^[[:space:]]*$/d' | sed '/^[[:space:]]*#/d' |
        grep -e 'FRONTEND_ORIGIN' -e 'DB_*' |
        grep -v -e 'DB_RESOURCE_ID' -e 'DB_SECURITY_GROUP' |
        tr '\n' ',' | sed 's/,$//'
}

eb create --cname "$ENV_NAME" --single --envvars "`envvars`" "$ENV_NAME"
