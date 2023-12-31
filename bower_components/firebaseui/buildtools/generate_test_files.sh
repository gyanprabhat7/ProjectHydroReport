#!/bin/bash
# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Generates the temporary files needed for tests to run, putting them in the
# generated/ directory.
#
# Usage:
# $ buildtools/generate_test_files.sh

# CD to the root FirebaseUI directory, which should be the parent directory of
# buildtools/.
cd "$(dirname $(dirname "$0"))"

echo "Compiling templates..."
npm run build-soy
mkdir -p ./generated
cp -r ./out/soy/* ./generated

echo "Generating dependency file..."
node node_modules/.bin/closure-make-deps \
    --closure-path="node_modules/google-closure-library/closure/goog" \
    --file="node_modules/google-closure-library/closure/goog/deps.js" \
    --root="soy" \
    --root="generated" \
    --root="javascript" \
    --root="node_modules/google-closure-templates/javascript" \
    --exclude="generated/all_tests.js" \
    --exclude="generated/deps.js" \
    --exclude="javascript/externs" \
    > generated/deps.js

echo "Generating test HTML files..."
python ./buildtools/gen_test_html.py
python ./buildtools/gen_all_tests_js.py > generated/all_tests.js

echo "Done."
