package user.bean;


import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class UserPaging {
    private int currentPage;	// 현재페이지
    private int pageBlock;		//[이전][1][2][3][다음]
    private int pageSize;		// 1페이당 5개
    private int totalA;			// 전체 게시글수
    private StringBuffer pagingHTML;

    public void makePaingHTML() {
        pagingHTML = new StringBuffer();

        //총 페이지 수
        int totalP = (totalA + pageSize - 1) / pageSize;

        int startPage = (currentPage-1)/pageBlock *pageBlock + 1;
        int endPage = startPage + pageBlock - 1;
        if(endPage > totalP) endPage = totalP;
        if(startPage != 1) {
            pagingHTML.append("<span onclick='userPaging("+ (startPage-1) + ")'>이전</span>");
        }
        for(int i=startPage;i <= endPage;i++) {
            if(i == currentPage) {
                pagingHTML.append("<span id='currentPaging' onclick='userPaging("+i+")'>" + i + "</span>");
            }else {
                pagingHTML.append("<span id='paging' onclick='userPaging("+i+")'>" + i + "</span>");
            }
        }
        if(endPage < totalP) {
            pagingHTML.append("<span onclick='userPaging("+ (endPage + 1) +")'>다음</span>");
        }
    }
}
