/**
 * Created by alexbol on 10/27/2015.
 */
export var loadJson;

function *loadJson(url, success, error)
{
    var result = yield request(url);
    var data = JSON.parse(result);
    // success(data);
    console.log(data);
};

function request(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    it.next(xhr.responseText);
                }
                    /*success(JSON.parse(xhr.responseText));*/
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
