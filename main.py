import requests
from bs4 import BeautifulSoup
import csv
import time

#2023-2024 season
teamList = ['Arsenal', 'Tottenham'
            ,'Aston-Villa', 'Bournemouth'
            , 'Brentford', 'Brighton'
            , 'Chelsea', 'Crystal-Palace'
            , 'Everton', 'Fulham'
            , 'Liverpool', 'Manchester-City'
            , 'Manchester-United', 'Newcastle-United'
            , 'Nottingham-Forest', 'West-Ham-United'
            , 'Wolverhampton-Wanderers']
urlList = ['https://fbref.com/en/squads/18bb7c10/2023-2024/c9/Arsenal-Stats-Premier-League#all_stats_standard', 'https://fbref.com/en/squads/361ca564/2023-2024/c9/Tottenham-Hotspur-Stats-Premier-League#all_stats_standard'
           , 'https://fbref.com/en/squads/8602292d/2023-2024/Aston-Villa-Stats#all_stats_standard', 'https://fbref.com/en/squads/4ba7cbea/2023-2024/Bournemouth-Stats#all_stats_standard'
           , 'https://fbref.com/en/squads/cd051869/2023-2024/Brentford-Stats#all_stats_standard', 'https://fbref.com/en/squads/d07537b9/2023-2024/Brighton-and-Hove-Albion-Stats#all_stats_standard'
           , 'https://fbref.com/en/squads/cff3d9bb/2023-2024/Chelsea-Stats#all_stats_standard', 'https://fbref.com/en/squads/47c64c55/2023-2024/Crystal-Palace-Stats#all_stats_standard'
           , 'https://fbref.com/en/squads/d3fd31cc/2023-2024/Everton-Stats#all_stats_standard', 'https://fbref.com/en/squads/fd962109/2023-2024/Fulham-Stats#all_stats_standard'
           , 'https://fbref.com/en/squads/822bd0ba/2023-2024/Liverpool-Stats#all_stats_standard', 'https://fbref.com/en/squads/b8fd03ef/2023-2024/Manchester-City-Stats#all_stats_standard'
           , 'https://fbref.com/en/squads/19538871/2023-2024/Manchester-United-Stats#all_stats_standard', 'https://fbref.com/en/squads/b2b47a98/2023-2024/Newcastle-United-Stats#all_stats_standard'
           , 'https://fbref.com/en/squads/e4a775cb/2023-2024/Nottingham-Forest-Stats#all_stats_standard', 'https://fbref.com/en/squads/7c21e445/2023-2024/West-Ham-United-Stats'
           , 'https://fbref.com/en/squads/8cec06e1/2023-2024/Wolverhampton-Wanderers-Stats']

'''
data = requests.get('https://fbref.com/en/squads/361ca564/2023-2024/c9/Tottenham-Hotspur-Stats-Premier-League#all_stats_standard')
if data == None:
    print("sdfdsfsddsfdsfdsfdsfsdfdsfsdfdfs")
else:
    #print(data)
    #print(data.text)
    print(data.content)
    print(data.headers)
soup = BeautifulSoup(data.text, 'html.parser')
if soup == None:
    print('soup is None')
teamMemberStatDic = {}
test = soup.select_one('#stats_standard_9 > tbody > tr:nth-child(3)')
if test == None:
    print('test is None')
data_stat_values = []
vl = []
statDic = {}
for tag in test.find_all(attrs={'data-stat': True}):
    data_stat_value = tag['data-stat']
    data_stat_values.append(data_stat_value)
    vl.append(tag.text)
    statDic[data_stat_value] = tag.text
print(statDic)
'''
#print(test)

#child = '#stats_standard_9 > tbody > tr:nth-child(' + str(1) + ')'
#print(soup.select_one(child))
print('start')
for tIdx in range(3, len(teamList)):
    htmlPage = requests.get(urlList[tIdx])
    soup = BeautifulSoup(htmlPage.text, 'html.parser')

    teamName = teamList[tIdx]#
    data = []#
    tagList = []#
    for pIdx in range(1, 60):
        childSelector = '#stats_standard_9 > tbody > tr:nth-child(' + str(pIdx) + ')'
        player = soup.select_one(childSelector)
        if player == None:
            break

        #tag list 만들기 위해서
        if pIdx == 1:
            tagList.append("team")
            for tag in player.find_all(attrs={'data-stat': True}):
                tagList.append(tag['data-stat'])
            tagList.pop()
            data.append(tagList)
        ################################################

        playerStatList = []#
        playerStatList.append(teamName)
        for tag in player.find_all(attrs={'data-stat': True}):
            playerStatList.append(tag.get_text(strip=True))
        playerStatList.pop()
        data.append(playerStatList)
    #print(data)

    ########
    ##csv 파일 만들기
    fileName = teamName + "_2023-2024" + ".csv"
    f = open(fileName, "w")
    writer = csv.writer(f)
    writer.writerows(data)
    f.close()
    time.sleep(120)
    #ip 차단 막기위해

#print(memberStatByTeam)
###
#stats_standard_9 > tbody > tr:nth-child(3) > th                이름
#stats_standard_9 > tbody > tr:nth-child(3) > td.left.poptip    국적
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(3)   포지션
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(4)   나이
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(5)   출전 게임 수
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(6)   선발 출전 수
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(7)   출전 시간(분)
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(8)   90분 단위 출전 경기 수
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(9)   득점
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(10)  어시스트
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(15)  엘로카드
#stats_standard_9 > tbody > tr:nth-child(3) > td.right.iz       레드카드

#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(17)  xG  값
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(18)  npxG
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(19)  xg_assist
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(22)  전진 패스
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(24)  90분당 골 수
#stats_standard_9 > tbody > tr:nth-child(3) > td:nth-child(25)  90분강 어시스트 수
