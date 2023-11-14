import { Province } from 'src/modules/user/entity/province.entity';
import { CommonListResponse } from '../../../../common/helpers/api.response';

export class ProvinceList extends CommonListResponse<Province> {
    items: Province[];
}
