package company.newlife.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class FileDir {
    @Value("${file.dir}")
    private String fileDir;

    @Value("${file.dir.test}")
    private String fileDirTest;
}
