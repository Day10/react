import C from '../constants';

export const AddChat = id => ({
    type: C.ADDCHAT,
    id: id
})

export const AddEditor = id => ({
    type: C.ADDEDITOR,
    id: id
})

export const AddHome = id => ({
    type: C.ADDHOME,
    id: id
})

export const AddSystem = id => ({
    type: C.ADDSYSTEM,
    id: id
})