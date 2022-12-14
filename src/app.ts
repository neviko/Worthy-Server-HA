import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import express, { Application, Request, Response } from 'express'
import EvaluationDto from './dto/evaluation.dto'
import { evaluateDiamondPrice, evaluationHandler, getDiamondsByPrice, randomlyGenerateDiamondData } from './services/diamond.service'
import { dtoValidation } from './validation.handler'
const cors = require('cors')


const app: Application = express()

app.use(cors({
    origin: '*',
}));


const port: number = 3001

app.get('/evaluation', cors(),  async (req: Request, res: Response):Promise<void> => {

    const errorMessage = await dtoValidation(EvaluationDto,req.query)
    if (errorMessage){
        res
        .status(400)
        .send(errorMessage)
    }
    const evaluatedPrice = evaluationHandler(req.query)
    res.status(200).send({evaluatedPrice})
    
})

app.get('/similar', cors(),  async (req: Request, res: Response):Promise<void> => {

    

    const similarDiamonds = getDiamondsByPrice(req.query)
    res.status(200).send({similarDiamonds})

    
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
    for(let i=0;i<50;i++){
        randomlyGenerateDiamondData()
    }
    console.log('Diamonds created');
    
})