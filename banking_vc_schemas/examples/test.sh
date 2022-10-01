#!/usr/bin/env bash
cd=${BASH_SOURCE%/*}
sd="$cd/.."
echo "vc_authorization_subject.json"
 jsonschema -i $cd/vc_authorization_subject.json $sd/vc_authorization.json 
echo "vc_bankaccounts_subject.json"
 jsonschema -i $cd/vc_bankaccounts_subject.json  $sd/vc_bankaccounts.json 
echo "vc_identity_subject.json"
 jsonschema -i $cd/vc_identity_subject.json  $sd/vc_identity.json 
echo "vc_transactions_subject.json"
 jsonschema -i $cd/vc_transactions_subject.json  $sd/vc_transactions.json 