var api = {

    apiUrl: 'https://yjac0t0jbg.execute-api.ap-southeast-2.amazonaws.com/',
    setAccessToken(access_token) {
        this.access_token = access_token;
    },

    async readOverlaySetup() {
        const response = await fetch(this.apiUrl + 'overlay-setup', {
            headers: {
                'Authorization': this.access_token
            }
        })
        const json = await response.json()
        return json
    },

    async writeOverlaySetup(data) {
        const response = await fetch(this.apiUrl + 'overlay-setup', {
            method: 'POST',
            headers: {
                'Authorization': this.access_token
            },
            body: JSON.stringify(data)
        })
    },


}