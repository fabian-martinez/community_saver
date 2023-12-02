import { Request, Response } from "express";
import MemberService from "../services/memberService"
import logger from "../helpers/loggerService";
import { BadRequestError, NotFoundError } from "../helpers/errors";
import { validateFilter } from "../helpers/utilities";

class MemberController{

    private memberService:MemberService

    constructor(memberService:MemberService){
        this.memberService = memberService;
    }

    public getMembers = async (req:Request, res:Response):Promise<void> => {
        try {
            const page:number =  Number(req.query.page);
            const per_page:number = Number(req.query.per_page);
            const filter:any = validateFilter(req.query.filter);
            const members = await this.memberService.getMembers({page,per_page},filter)
            res.status(200).json(members)
        } catch (error) {
            logger.error(error)
            if (error instanceof BadRequestError) {
                res.status(error.code).json({ error: error.message });
              } else if (error instanceof NotFoundError) {
                res.status(error.code).json({ error: error.message });
              } else {
                res.status(500).json({ error: 'Internal Server Error' });
              }
        }
    }

    public getMember =async (req:Request, res:Response):Promise<void> => {
        try {
            const member_id:string = req.params.id
            const member = await this.memberService.getMember(member_id);
            res.status(200).json(member)
        } catch (error) {
            logger.error(error)
            if (error instanceof BadRequestError) {
                res.status(error.code).json({ error: error.message });
              } else if (error instanceof NotFoundError) {
                res.status(error.code).json({ error: error.message });
              } else {
                res.status(500).json({ error: 'Internal Server Error' });
              }
        }
    }

}

export default MemberController