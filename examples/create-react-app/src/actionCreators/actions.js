
export const fetchBusses = (fetchResponsePayload) =>{
    const url = `http://18.188.207.50/search?from_id=33052&to_id=34040&dojn=15/06/2018`;
    const response = fetch(url).then(response => response.json()).then(responsePayload =>{
        fetchResponsePayload(responsePayload)
    });
}