package company.newlife.util.paging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagingRequest {
    private int draw;
    private int length;
    private int start;
    private Boolean desc;
    private String orderBy;
}
