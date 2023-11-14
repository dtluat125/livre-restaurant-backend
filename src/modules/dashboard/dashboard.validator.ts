import { DATE_TIME_FORMAT } from './../../common/constants';
import * as BaseJoi from 'joi';
import { INPUT_TEXT_MAX_LENGTH } from 'src/common/constants';
import { DateRangeTypes } from './dashboard.constant';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);

export const revenueChartListQuerySchema = Joi.object().keys({
    dateRanges: Joi.array()
        .items(
            Joi.date().format(
                DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON,
            ),
        )
        .optional()
        .length(2)
        .allow(''),
    dateRangeType: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .valid(...Object.values(DateRangeTypes))
        .required(),
});
