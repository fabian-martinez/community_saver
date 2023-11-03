import { Router } from 'express';
import MemberController from '../controllers/memberController';
import MemberService from '../services/memberService';
import logger from '../helpers/loggerService';

const router = Router();

const memberService:MemberService = new MemberService()

const memberController:MemberController = new MemberController(memberService)

logger.debug(`Starting Member Service`)

router.get    ('/',                memberController.getMembers);
router.get    ('/:id',             memberController.getMember);

export default router