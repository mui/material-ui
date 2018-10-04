#!/bin/bash

RESET="\\e[0m"
RED="\\e[31m"
GREEN="\\e[32m"
YELLOW="\\e[33m"

GIT_ROOT=$(git rev-parse --show-cdup)

function print_info() {
  printf "${YELLOW}${1}${RESET}\n"
}

function print_error() {
  printf "${RED}${1}${RESET}\n"
}

if ! git diff --quiet --exit-code
then
  echo ""
  print_error "==========================================================================="
  print_error "Stage is not clean. Either commit or stash your changes before you proceed."
  print_error "==========================================================================="
  exit 1
fi

# print_info "• Backing up modified files."
print_info "• Making sure that the upstream repository exists."

# Check if the upstream remote already exists, if not we add it
if git ls-remote --exit-code --quiet upstream &> /dev/null = 0
then
  print_info "  No upstream repository found, adding it now."
  git remote add upstream git@github.com:mui-org/material-ui.git
fi

# GIT_MERGE_BASE=$(git merge-base upstream/master origin/master)
# git checkout "$GIT_MERGE_BASE" -- pages

print_info "• Fetching changes from upstream."
git fetch upstream master &> /dev/null

print_info "• Rebasing upstream/master"
git rebase upstream/master

