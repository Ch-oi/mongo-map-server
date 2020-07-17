const knex = require('../database/config')

class MapService {

    async listAreas() {
        let areas =
            await knex('area')
                .select('*')
                .catch(err => console.log(err))

        return areas
    }

    async listDistricts() {
        let districts =
            await knex('districts')
                .select('*')
                .catch(err => console.log(err))

        return districts
    }

    async getAreaDistricts(area_id) {
        let districts =
            await knex('districts')
                .select('*')
                .where('area_id',area_id)
                .catch(err => console.log(err))

        return districts
    }

    async getDistrictUsers(district_id) {
        let districtUsers =
            await knex('users-districts')
                .innerJoin('users', 'users-districts.user_id', 'users.id')
                .select('users-districts.id', 'user_id', 'user_name')
                .where('district_id', district_id)

        return districtUsers
    }

    //work with above result
    async getDistrictUserBlogs(districtUsers) {
        let districtUsersBlogs = []

        for (let districtUser of districtUsers) {
            let userBlogs =
                await knex('blogs')
                    .select('id', 'title', 'main_picture_URL')
                    .where('userDistrict_id', districtUser.id)
                    .catch(err => console.log(err))

            districtUser.userBlogs = userBlogs
            districtUsersBlogs.push(districtUser)
        }
        return districtUsersBlogs
    }

    async addDistrict(district) {
        await knex.raw('SELECT setval(\'districts_id_seq\', (SELECT MAX(id) from districts));')
        let newDistrict =
            await knex('districts')
                .insert(district)
                .returning('*')
                .catch(err => console.log(err))

        return newDistrict
    }



}

module.exports = MapService