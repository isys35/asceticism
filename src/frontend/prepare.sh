#!/usr/bin/env bash

BACKEND_PRE_COMMIT_DIR=src/backend/.pre-commit/

# Установка пре-коммита для бэка
cd ../backend
git config --unset-all core.hooksPath
pre-commit install --allow-missing-config
pre-commit install --hook-type commit-msg --allow-missing-config
cd ../../
mkdir -p "$BACKEND_PRE_COMMIT_DIR"
mv .git/hooks/commit-msg "$BACKEND_PRE_COMMIT_DIR"
mv -f .git/hooks/pre-commit "$BACKEND_PRE_COMMIT_DIR"

echo "pre-commit replaced to $BACKEND_PRE_COMMIT_DIR"

husky install src/frontend/.husky

