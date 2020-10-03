package company.newlife.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Post {
    private Integer id;
    private String title;
    private String content;
    private Boolean active;
    private String createdDate;
    private String lastModifiedDate;
    private String imagePostUrl;
    private User user;
    private Category category;
    private Tag tag;
}
