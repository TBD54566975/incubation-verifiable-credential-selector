# VC Issuer API service

### VC Issuer vs VCS
- The VCS(Incubation-Verifiable-Credential-Selector) provides a widget user interface that allows users to create a connection between the data aggregator and the financial institution that manages their accounts, during which handles credential input and MFA challenges. 

- The VC Issuer issues the standard, signed VC(Verifiable-Credential) with the information from the connection established by VCS

### Sophtron VC issuer API
A sophtron implemented VC issuer API service that issues sophtron-signed VC based on the draft VC spec and VC API spec
available at https://vc.sophtron.com/docs

### The work flow
- User loads VCS and select the Financial information
- User enters information according to the widget prompts
- At the end of user flow, when the connection is successfully created, VCS returns the `connection_id` via its `event`.
- Server sends vc issuing request to VC issuer API with the `connection_id`

### More documents and Examples
- Detailed API spec document available at https://vc.sophtron.com/docs
- Example VC API client code: [vc-client-example](vc-client-example/example.js)