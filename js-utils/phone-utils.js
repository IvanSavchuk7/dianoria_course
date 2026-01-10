(function () {
    function isObviouslyFakeNumber(num) {
        const digits = num.replace(/\D/g, "");
        if (/^(\d)\1{5,}$/.test(digits)) return true;
        if (new Set(digits.split("")).size <= 2) return true;
        if (/(012345|123456|234567|345678|456789|987654|876543)/.test(digits)) return true;
        if (digits.length < 7 || digits.length > 15) return true;
        if ([/^178[45]/, /^447520/].some(r => r.test(digits))) return true;
        return false;
    }

    function validatePhone(rawPhone) {
        rawPhone = rawPhone.trim();
        let phone;
        try {
            phone = libphonenumber.parsePhoneNumberFromString(rawPhone);
            if (phone?.isValid()) return phone;
        } catch {}

        if (!rawPhone.startsWith("+")) {
            try {
                phone = libphonenumber.parsePhoneNumberFromString("+" + rawPhone);
                if (phone?.isValid()) return phone;
            } catch {}
        }

        for (const c of ["UA","PL","DE","RO","BG","CZ","SK","US","GB","FR","ES","RS"]) {
            try {
                phone = libphonenumber.parsePhoneNumberFromString(rawPhone, c);
                if (phone?.isValid()) return phone;
            } catch {}
        }
        return null;
    }

    window.PhoneUtils = {
        validatePhone,
        isObviouslyFakeNumber
    };
})();
