import request from '@/request'
export function getAnimal(params: any) {
    return request({
        url: '/api/v2/random',
        method: 'get',
        data: params
    })
}