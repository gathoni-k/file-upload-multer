const request = require('supertest')
const fs = require('mz/fs')
const path = require('path')
const app = require('../app')
let testFilePath = null

afterAll( async (done) => {
    // check if file exists
    const file =`../file-upload-multer/${testFilePath}`
    try {
        const exists = await fs.exists(file)
        if (!exists) throw new Error('File does not exist')
        fs.unlink(path.resolve(file), (err) => {
            if(err) throw new Error('Could not delete file')
            done()
        })
    } catch (error) {
        done(error)
    }
})

describe('POST /api/upload', () => {
    const testFile = '__tests__/testFiles/pizza.xls'
    it('should upload file', (done) => {
        request(app)
        .post('/api/upload')
        .attach('excelFile', testFile)
        .end((err, res) => {
            const { success, message, file} = res.body
            expect(res.status).toBe(201)
            expect(success).toBe('true')
            expect(message).toBe('Upload successful')
            testFilePath = file.path
            done()
        })
    })
})