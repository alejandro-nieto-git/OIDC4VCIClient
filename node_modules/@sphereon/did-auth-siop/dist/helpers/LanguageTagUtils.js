"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageTagUtils = void 0;
const language_tags_1 = __importDefault(require("language-tags"));
const types_1 = require("../types");
const ObjectUtils_1 = require("./ObjectUtils");
class LanguageTagUtils {
    /**
     * It will give back a fields which are language tag enabled. i.e. all fields with the fields names containing
     * language tags e.g. fieldName#nl-NL
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     */
    static getAllLanguageTaggedProperties(source) {
        return this.getLanguageTaggedPropertiesMapped(source, undefined);
    }
    /**
     * It will give back a fields which are language tag enabled and are listed in the required fields.
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     * @param requiredFieldNames the fields which are supposed to be language enabled. These are the only fields which should be returned.
     */
    static getLanguageTaggedProperties(source, requiredFieldNames) {
        const languageTagEnabledFieldsNamesMapping = new Map();
        requiredFieldNames.forEach((value) => languageTagEnabledFieldsNamesMapping.set(value, value));
        return this.getLanguageTaggedPropertiesMapped(source, languageTagEnabledFieldsNamesMapping);
    }
    /**
     * It will give back a fields which are language tag enabled and are mapped in the required fields.
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     * @param requiredFieldNamesMapping the fields which are supposed to be language enabled. These are the only fields which should be returned. And
     *                                  the fields names will be transformed as per the mapping provided.
     */
    static getLanguageTaggedPropertiesMapped(source, requiredFieldNamesMapping) {
        this.assertSourceIsWorthChecking(source);
        this.assertValidTargetFieldNames(requiredFieldNamesMapping);
        const discoveredLanguageTaggedFields = new Map();
        Object.entries(source).forEach(([key, value]) => {
            const languageTagSeparatorIndexInKey = key.indexOf(this.LANGUAGE_TAG_SEPARATOR);
            if (this.isFieldLanguageTagged(languageTagSeparatorIndexInKey)) {
                this.extractLanguageTaggedField(key, value, languageTagSeparatorIndexInKey, requiredFieldNamesMapping, discoveredLanguageTaggedFields);
            }
        });
        return discoveredLanguageTaggedFields;
    }
    static extractLanguageTaggedField(key, value, languageTagSeparatorIndexInKey, languageTagEnabledFieldsNamesMapping, languageTaggedFields) {
        const fieldName = this.getFieldName(key, languageTagSeparatorIndexInKey);
        const languageTag = this.getLanguageTag(key, languageTagSeparatorIndexInKey);
        if (language_tags_1.default.check(languageTag)) {
            if (languageTagEnabledFieldsNamesMapping === null || languageTagEnabledFieldsNamesMapping === void 0 ? void 0 : languageTagEnabledFieldsNamesMapping.size) {
                if (languageTagEnabledFieldsNamesMapping.has(fieldName)) {
                    languageTaggedFields.set(this.getMappedFieldName(languageTagEnabledFieldsNamesMapping, fieldName, languageTag), value);
                }
            }
            else {
                languageTaggedFields.set(key, value);
            }
        }
    }
    static getMappedFieldName(languageTagEnabledFieldsNamesMapping, fieldName, languageTag) {
        return languageTagEnabledFieldsNamesMapping.get(fieldName) + this.LANGUAGE_TAG_SEPARATOR + languageTag;
    }
    static getLanguageTag(key, languageTagSeparatorIndex) {
        return key.substring(languageTagSeparatorIndex + 1);
    }
    static getFieldName(key, languageTagSeparatorIndex) {
        return key.substring(0, languageTagSeparatorIndex);
    }
    /***
     * This function checks about the field to be language-tagged.
     *
     * @param languageTagSeparatorIndex
     * @private
     */
    static isFieldLanguageTagged(languageTagSeparatorIndex) {
        return languageTagSeparatorIndex > 0;
    }
    static assertValidTargetFieldNames(languageTagEnabledFieldsNamesMapping) {
        if (languageTagEnabledFieldsNamesMapping) {
            if (!languageTagEnabledFieldsNamesMapping.size) {
                throw new Error(types_1.SIOPErrors.BAD_PARAMS + ' LanguageTagEnabledFieldsNamesMapping must be non-null or non-empty');
            }
            else {
                for (const entry of languageTagEnabledFieldsNamesMapping.entries()) {
                    const key = entry[0];
                    const value = entry[1];
                    if ((0, ObjectUtils_1.isStringNullOrEmpty)(key) || (0, ObjectUtils_1.isStringNullOrEmpty)(value)) {
                        throw new Error(types_1.SIOPErrors.BAD_PARAMS + '. languageTagEnabledFieldsName must be non-null or non-empty');
                    }
                }
            }
        }
    }
    static assertSourceIsWorthChecking(source) {
        if (!source) {
            throw new Error(types_1.SIOPErrors.BAD_PARAMS + ' Source must be non-null i.e. not-initialized.');
        }
    }
}
exports.LanguageTagUtils = LanguageTagUtils;
LanguageTagUtils.LANGUAGE_TAG_SEPARATOR = '#';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VUYWdVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL0xhbmd1YWdlVGFnVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0VBQWlDO0FBRWpDLG9DQUFzQztBQUV0QywrQ0FBb0Q7QUFFcEQsTUFBYSxnQkFBZ0I7SUFHM0I7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsOEJBQThCLENBQUMsTUFBZTtRQUNuRCxPQUFPLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLDJCQUEyQixDQUFDLE1BQWUsRUFBRSxrQkFBaUM7UUFDbkYsTUFBTSxvQ0FBb0MsR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDNUYsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUYsT0FBTyxJQUFJLENBQUMsaUNBQWlDLENBQUMsTUFBTSxFQUFFLG9DQUFvQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFlLEVBQUUseUJBQThDO1FBQ3RHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsMkJBQTJCLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUU1RCxNQUFNLDhCQUE4QixHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUV0RixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDOUMsTUFBTSw4QkFBOEIsR0FBVyxHQUFH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