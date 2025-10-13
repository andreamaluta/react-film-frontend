import ReactCountryFlag from "react-country-flag";

const langToCountry = {
    en: 'US', it: 'IT', fr: 'FR', de: 'DE', es: 'ES', pt: 'BR',
    zh: 'CN', ja: 'JP', ru: 'RU', ko: 'KR', nl: 'NL', sv: 'SE',
    pl: 'PL', ar: 'SA', tr: 'TR', hi: 'IN'
};

const LanguageFlag = ({ language }) => {
    const code = langToCountry[language];
    return code ? (
        <ReactCountryFlag countryCode={code} svg style={{ fontSize: '2rem' }} />
    ) : (
        <span>🌐</span>
    );
};

export default LanguageFlag;
