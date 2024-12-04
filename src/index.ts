class _Type {
    _type: string = "_Type";
    value: unknown;

    constructor(value: unknown) {
        this.value = value;
    }

    static from<T = unknown>(value: T): _Type {
        const type = new _Type(value);
        return type;
    }

    static is(value: unknown): value is _Type {
        return value instanceof _Type;
    }
}

class _Boolean extends _Type {
    _type = "Boolean";
    value: boolean;

    constructor(value: boolean) {
        super(value);
        this.value = value;
    }

    static from(value: unknown): _Boolean {
        return new _Boolean(Boolean(value));
    }

    static is(value: unknown): value is _Boolean {
        return value instanceof _Boolean;
    }
}

class _Number extends _Type {
    _type = "Number";
    value: number;

    constructor(value: number) {
        super(value);
        this.value = value;
    }

    static from(value: unknown): _Number {
        return new _Number(Number(value));
    }

    static is(value: unknown): value is _Number {
        return value instanceof _Number;
    }
}

class _String extends _Type {
    _type = "String";
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }

    static from(value: unknown): _String {
        return new _String(String(value));
    }

    static is(value: unknown): value is _String {
        return value instanceof _String;
    }
}

const _Comparator = {
    EQUAL: "EQUAL",
    NOT_EQUAL: "NOT_EQUAL",
    GREATER: "GREATER",
    LESS: "LESS",
    GREATER_OR_EQUAL: "GREATER_OR_EQUAL",
    LESS_OR_EQUAL: "LESS_OR_EQUAL",
} as const;
type _Comparator = (typeof _Comparator)[keyof typeof _Comparator];


const condition = (comparator: _Comparator) => (a: _Type, b: _Type): _Boolean => {
    if (_Number.is(a) && _Number.is(b)) {
        switch (comparator) {
            case _Comparator.EQUAL:
                return _Boolean.from(a.value === b.value);
            case _Comparator.NOT_EQUAL:
                return _Boolean.from(a.value !== b.value);
            case _Comparator.GREATER:
                return _Boolean.from(a.value > b.value);
            case _Comparator.LESS:
                return _Boolean.from(a.value < b.value);
            case _Comparator.GREATER_OR_EQUAL:
                return _Boolean.from(a.value >= b.value);
            case _Comparator.LESS_OR_EQUAL:
                return _Boolean.from(a.value <= b.value);
            default:
                throw new Error("Invalid comparator");
        }
    }

    switch (comparator) {
        case _Comparator.EQUAL:
            return _Boolean.from(a.value === b.value);
        case _Comparator.NOT_EQUAL:
            return _Boolean.from(a.value !== b.value);
        default:
            throw new Error("Invalid comparator");
    }
}

const year = _Number.from(new Date().getFullYear());
const birthYear = _Number.from(1987);
const isAdult = condition(_Comparator.GREATER_OR_EQUAL)(year, birthYear);

console.log("Operator", isAdult.value);

