function createCompiled(information, job, user, id) {
    let compiled = {};
    compiled[id] = {
        ...(information ? {name: information.name} : {}),
        ...(user?.city ? {city: user.city} : {}),
        ...(user?.age ? {age: user.age} : {}),
        ...(job?.job ? {job: job.job} : {}),

    };
    return compiled;

}

module.exports = createCompiled;
