import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from "@angular/http";

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import { environment } from "../../../../environments/environment";

@Injectable()
export class MyService {

    private baseUrl: string;
    private adminUrl: string;

    constructor(private http: Http) {
        this.baseUrl = "http://localhost:9000/";
        this.adminUrl = "http://blockwork.projects.mrt.ac.lk/grant_access.php"
    }

    String2Hex(str: string) {
        let hex, i;

        let result = "";
        for (i = 0; i < str.length; i++) {
            hex = str.charCodeAt(i).toString(16);
            result += ("000" + hex).slice(-4);
        }
        return result;
    }

    Hex2String(hex_str: string) {
        let j;
        let hexes = hex_str.match(/.{1,4}/g) || [];
        let result_back = "";
        for (j = 0; j < hexes.length; j++) {
            result_back += String.fromCharCode(parseInt(hexes[j], 16));
        }

        return result_back;
    }


    node(): Promise<any> {
        return this.http.get(this.baseUrl + "node").toPromise()
            .then(response => response)
            .catch((error: Error) => console.log(error));
    }

    checkchain(): Promise<any> {
        return this.http.get(this.baseUrl + "checkchain").toPromise()
            .then(response => response)
            .catch((error: Error) => console.log(error));
    }

    startchain(): Promise<any> {
        return this.http.get(this.baseUrl + "start").toPromise()
            .then(response => response)
            .catch((error: Error) => console.log(error));
    }

    stopchain(): Promise<any> {
        return this.http.get(this.baseUrl + "stop").toPromise()
            .then(response => response)
            .catch((error: Error) => console.log(error));
    }

    grantInRegister(node: string,user:string,email:string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('node', node);
        params.set('user', user); 
        params.set('email', email);                       
        return this.http.get(this.adminUrl, { search: params }).toPromise()
                    .then(response => response)
                    .catch((error: Error) => console.log(error));
    }

    getinfo(): Promise<any> {
        return this.callAPI('getInfo', 'get', null, null, null);
    }

    getaddresses(): Promise<any> {
        return this.callAPI('getAddresses', 'get', null, null, null);
    }

    listpermissions(permissions: any, addresses: any): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (permissions) {
            params.set('permissions', permissions);
        }
        if (addresses) {
            params.set('addresses', addresses);
        }
        return this.callAPI('listpermissions', 'get', params, null, null);
    }

    getaddressbalances(address: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('address', address);
        return this.callAPI('getaddressbalances', 'get', params, null, null);
    }

    liststreams(): Promise<any> {
        return this.callAPI('liststreams', 'get', null, null, null);
    }

    createStream(name: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        return this.callAPI('create', 'get', params, null, null);
    }

    createStreamFrom(address: string, name: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('from_address', address);
        params.set('name', name);
        return this.callAPI('createfrom', 'get', params, null, null);
    }

    subscribeStream(streams: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('streams', streams);
        return this.callAPI('subscribe', 'get', params, null, null);
    }

    publishToStream(stream: string, key: string, data_hex: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('stream', stream);
        params.set('key', key);
        params.set('data_hex', data_hex);
        return this.callAPI('publish', 'get', params, null, null);
    }

    listStreamItems(stream: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('stream', stream);
        return this.callAPI('liststreamitems', 'get', params, null, null);
    }

    listStreamKeyItems(stream: string, key: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('stream', stream);
        params.set('key', key);
        return this.callAPI('liststreamkeyitems', 'get', params, null, null);
    }

    listStreamKeys(stream: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('stream', stream);
        return this.callAPI('liststreamkeys', 'get', params, null, null);
    }

    gettxoutdata(txid: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('txid', txid);
        return this.callAPI('gettxoutdata', 'get', params, null, null);
    }

    getstreamitem(stream: string, txid: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('stream', stream);
        params.set('txid', txid);
        return this.callAPI('getstreamitem', 'get', params, null, null);
    }

    getNewAddress(): Promise<any> {
        return this.callAPI('getnewaddress', 'get', null, null, null);
    }

    grantPermissions(address: string) {

        let permissions = 'connect,send,receive';

        let params: URLSearchParams = new URLSearchParams();
        params.set('addresses', address);
        params.set('permissions', permissions);
        return this.callAPI('grant', 'get', params, null, null);
    }

    getAddressBalances(address: string, includeLocked: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('address', address);
        params.set('includeLocked', includeLocked);
        return this.callAPI('getaddressbalances', 'get', params, null, null);
    }

    sendAsset(address: string, asset: string, qty: string): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('address', address);
        params.set('asset', asset);
        params.set('qty', qty);
        return this.callAPI('sendasset', 'get', params, null, null);
    }

    lockAssetsFrom(address: string, asset: string, qty: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('address', address);
        params.set('asset', asset);
        params.set('qty', qty);
        return this.callAPI('preparelockunspentfrom', 'get', params, null, null);
    }

    unlockAllAssets() {
        let params: URLSearchParams = new URLSearchParams();
        return this.callAPI('lockunspent', 'get', params, null, null);
    }

    sendAssetFrom(from_address: string, to_address: string, asset: string, qty: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('from_address', from_address);
        params.set('to_address',to_address);
        params.set('asset', asset);
        params.set('qty', qty);
        return this.callAPI('sendassetfrom', 'get', params, null, null);
    }

    
    callAPI(url: string, httpMethod: string, params: URLSearchParams, headers: Headers, body: string): Promise<any> {
        switch (httpMethod) {

            case 'get':
                return this.http.get(this.baseUrl + url, { search: params }).toPromise()
                    .then(response => response.json())
                    .catch((error: Error) => console.log(error));

            case 'post':
                return this.http.post(this.baseUrl + url, body, {
                    headers: headers,
                    search: params
                }).toPromise().then(response => response.json())
                    .catch((error: Error) => console.log(error));

            case 'put':
                return this.http.put(url, body, {
                    headers: headers,
                    search: params
                }).toPromise()
                    .catch((error: Error) => console.log(error));

            case 'delete':
                return this.http.delete(url, { search: params }).toPromise()
                    .catch((error: Error) => console.log(error));

            default:
                throw new Error('Unsupported http method');

        }
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}