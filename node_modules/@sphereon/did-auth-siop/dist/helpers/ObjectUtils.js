"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNullUndefined = exports.isStringNullOrEmpty = exports.extractDataFromPath = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractDataFromPath(obj, path) {
    return jsonpath_1.JSONPath.nodes(obj, path);
}
exports.extractDataFromPath = extractDataFromPath;
function isStringNullOrEmpty(key) {
    return !key || !key.length;
}
exports.isStringNullOrEmpty = isStringNullOrEmpty;
function removeNullUndefined(data) {
    if (!data) {
        return data;
    }
    //transform properties into key-values pairs and filter all the empty-values
    const entries = Object.entries(data).filter(([, value]) => value != null);
    //map through all the remaining properties and check if the value is an object.
    //if value is object, use recursion to remove empty properties
    const clean = entries.map(([key, v]) => {
        const value = typeof v === 'object' && !Array.isArray(v) ? removeNullUndefined(v) : v;
        return [key, value];
    });
    //transform the key-value pairs back to an object.
    return Object.fromEntries(clean);
}
exports.removeNullUndefined = removeNullUndefined;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9PYmplY3RVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBeUQ7QUFFekQsOERBQThEO0FBQzlELFNBQWdCLG1CQUFtQixDQUFDLEdBQVksRUFBRSxJQUFZO0lBQzVELE9BQU8sbUJBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCxrREFFQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLEdBQVc7SUFDN0MsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDN0IsQ0FBQztBQUZELGtEQUVDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsSUFBYTtJQUMvQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCw0RUFBNEU7SUFDNUUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQztJQUMxRSwrRUFBK0U7SUFDL0UsOERBQThEO0lBQzlELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUNILGtEQUFrRDtJQUNsRCxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQWRELGtEQWNDIn0=