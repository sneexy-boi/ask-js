#!/bin/bash
FILE_INDICATOR=/etc/askjs-initialized

if [ ! -e "${FILE_INDICATOR}" ]; then
    cd /askjs && pnpm migrate
    touch ${FILE_INDICATOR}
fi

cd /askjs && pnpm start