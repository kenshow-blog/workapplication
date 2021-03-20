export interface LOGIN_USER {
    id: number;
    username: string;
}

export interface FILE extends Blob {
    readonly LastModified: number;
    readonly name: string;
}

export interface PROFILE {
    id: number;
    user_profile: number;
    img: string | null;
}

export interface POST_PROFILE {
    id: number;
    img: File | null;
}

export interface CRED {
    username: string;
    password: string;
}
export interface JWT {
    refresh: string;
    access: string;
}

export interface USER {
    id: number;
    username: string;
}
export interface AUTH_STATE {
    isLoginView: boolean;
    openModal: boolean;
    loginUser: LOGIN_USER;
    profile: PROFILE[];
}

//PDCA
export interface ACTION {
    id: number;
    action: string;
    pdca: number;
    action_user: number;
    category: number;
    category_item:string;
    created_at: string;
    updated_at: string;
}

export interface CATEGORY {
    id: number;
    item: string;
}

export interface PDC {
    id: number;
    userPdc: number;
    title: string;
    plan: string;
    do: string;
    check: string;
    created_at: string;
    updated_at: string;
}
export interface ACTIONS {
    rows: ACTION[]
}


export interface PDCA_STATE {
    actions: ACTION[],
    category: CATEGORY[],
    pdc: PDC[],
    selectedPdc: PDC,
    editedPdc: PDC,
    editedAction: ACTION,
    editView: boolean,
    createView: boolean,
}


