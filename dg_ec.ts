interface Result {
    [key: number]: string;
}

const dgUsers: any[] = [
    {
        'users_identification': 123,
        'sedes_name': 'medellin'
    },
    {
        'users_identification': 1234,
        'sedes_name': 'medellin'
    },
    {
        'users_identification': 12345,
        'sedes_name': 'medellin'
    },
    {
        'users_identification': 123456,
        'sedes_name': 'medellin'
    },
];
const userCediEcontrol = [
    {
        'identification': 123,
        'cedi': 'medellin'
    },
    {
        'identification': 1234,
        'cedi': 'cali'
    },
    {
        'identification': 12345,
        'cedi': 'bogota'
    },
    {
        'identification': 123456,
        'cedi': 'barranquilla'
    },
];
const result: Result = {}
// transformar userCediEcontrol a objeto clave identification y valor cedi
userCediEcontrol.forEach(item => {
    if (!result[item.identification]) {
        result[item.identification] = item.cedi;
    }
});
console.log(result)

const dgEc = () => {
    dgUsers.forEach((user, i) => {
        // console.log(result[user['users_identification']])
        user['sedes_name'] = result[user['users_identification']]
    })

    console.log(dgUsers);
};
dgEc();