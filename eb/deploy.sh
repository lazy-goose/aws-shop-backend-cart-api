#!/bin/sh -e

ENV_NAME="${1:-lazy-goose-cart-api-develop}"

eb deploy "$ENV_NAME"
