export declare class LanguageTagUtils {
    private static readonly LANGUAGE_TAG_SEPARATOR;
    /**
     * It will give back a fields which are language tag enabled. i.e. all fields with the fields names containing
     * language tags e.g. fieldName#nl-NL
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     */
    static getAllLanguageTaggedProperties(source: unknown): Map<string, string>;
    /**
     * It will give back a fields which are language tag enabled and are listed in the required fields.
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     * @param requiredFieldNames the fields which are supposed to be language enabled. These are the only fields which should be returned.
     */
    static getLanguageTaggedProperties(source: unknown, requiredFieldNames: Array<string>): Map<string, string>;
    /**
     * It will give back a fields which are language tag enabled and are mapped in the required fields.
     *
     * @param source is the object from which the language enabled fields and their values will be extracted.
     * @param requiredFieldNamesMapping the fields which are supposed to be language enabled. These are the only fields which should be returned. And
     *                                  the fields names will be transformed as per the mapping provided.
     */
    static getLanguageTaggedPropertiesMapped(source: unknown, requiredFieldNamesMapping: Map<string, string>): Map<string, string>;
    private static extractLanguageTaggedField;
    private static getMappedFieldName;
    private static getLanguageTag;
    private static getFieldName;
    /***
     * This function checks about the field to be language-tagged.
     *
     * @param languageTagSeparatorIndex
     * @private
     */
    private static isFieldLanguageTagged;
    private static assertValidTargetFieldNames;
    private static assertSourceIsWorthChecking;
}
