import { BaseEntity } from 'src/common/entities/BaseEntity';
import { GeneralSettingValueDto } from 'src/modules/setting/dto/request/general-setting.dto';
import { SettingKey } from 'src/modules/setting/setting.constant';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'general_settings' })
export class GeneralSettings extends BaseEntity {
    @Column({
        nullable: false,
    })
    key: SettingKey;

    @Column({
        type: 'json',
        nullable: false,
    })
    values: GeneralSettingValueDto[];
}
